export const isSelected = (pickedDates, template) =>
    pickedDates.includes(template);

export const prepareSlotToDate = ({ e, datetime, ind = '' }) => {
    const [hours, minutes] = ind
        ? ind.split('_')
        : e.target.dataset.ind?.split('_') ?? [];

    if (!hours || !minutes) return;

    return datetime
        .set('hours', hours)
        .set('minutes', minutes * 15)
        .set('seconds', 0);
};

let clickedDate = null;
let oldPickedDates = [];

// При выборе начала промежутка
export const handleMouseDown = ({
    setMouseSelecting,
    mouseSelecting,
    setDeleting,
    isDeleting,
    template,
    datetime,
    dates,
    e,
}) => {
    oldPickedDates = dates.get();
    if (mouseSelecting) {
        setMouseSelecting(false);

        return;
    }

    console.log(e);

    const date = prepareSlotToDate({ e, datetime });

    setMouseSelecting(true);

    // Если начало промежутка от уже выбранной даты
    if (isSelected(oldPickedDates, template(date))) {
        // Удаление
        if (!isDeleting) setDeleting(true);

        dates.removeDate(template(date));
    }
    // Если начало промежутка от невыбранной
    else {
        dates.addDate(template(date));
        clickedDate = date;
    }
};

const updateDate = ({ template, date: datetime, isDeleting }) => {
    const newPickedDates = [];
    const currentDay = clickedDate?.clone();

    const handlePickedDates = (datetime) => {
        if (
            !newPickedDates.includes(template(datetime)) &&
            !oldPickedDates.includes(template(datetime))
        ) {
            newPickedDates.push(template(datetime));
        }
    };

    if (isDeleting || !currentDay) return null;

    if (currentDay.isBefore(datetime)) {
        handlePickedDates(datetime);

        while (currentDay.isBefore(datetime)) {
            handlePickedDates(currentDay);
            currentDay.add(15, 'minutes');
        }
    } else {
        handlePickedDates(datetime);

        while (currentDay.isAfter(datetime)) {
            currentDay.subtract(15, 'minutes');
            handlePickedDates(datetime);
        }
    }

    return newPickedDates;
};

// При перемещении курсора
export const handleMouseEnter = ({
    mouseSelecting,
    isDeleting,
    template,
    datetime,
    dates,
    e,
}) => {
    if (!mouseSelecting || !e.target.dataset.ind) return;

    const [hours, minutes] = e.target.dataset.ind.split('_') ?? [];
    const date = datetime
        .set('hours', hours)
        .set('minutes', minutes * 15)
        .set('seconds', 0);

    const newPickedDates = updateDate({
        template,
        date,
        isDeleting,
    });

    // Если в промежутке есть выбранная дата
    if (isSelected(oldPickedDates, template(date))) {
        if (!isDeleting) {
            dates.setNewDates([...oldPickedDates, ...newPickedDates]);
        } else {
            dates.removeDate(template(date));
        }
    }
    // Если в промежутке выбранная дата пустая
    else {
        if (!isDeleting) {
            console.log(newPickedDates);
            dates.setNewDates([...[...oldPickedDates], ...newPickedDates]);
            newPickedDates.length = 0;
        }
    }
};
