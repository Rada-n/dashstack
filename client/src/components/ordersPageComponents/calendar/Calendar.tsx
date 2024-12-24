import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useActions } from '../../../hooks/useActions';
import { DateState } from '../../../Slices/ordersSlice';

interface CalendarProps {
  isCalendarOpen?: boolean
  setDateEvent?: () => void
}

const Calendar: React.FC<CalendarProps> = ({ isCalendarOpen, setDateEvent }) => {
    const [dateRange, setDateRange] = useState<DateState>({ from: '', to: '' });
    const { setDate } = useActions()
  
    const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
      if (dates) {
        const [start, end] = dates;
        const range = { from: start, to: end }
        setDateRange(range);
        isCalendarOpen ? setDateEvent(range) : setDate(range)
        console.log(range)
      } else {
        const noDates = { from: null, to: null }
        setDateRange(noDates);
        isCalendarOpen ? setDateEvent(noDates) : setDate(noDates)
      }
    };
  
  
    return (
      <div style={{width: '100%'}}>
          <DatePicker
            selectsRange
            startDate={dateRange.from}
            endDate={dateRange.to}
            onChange={handleDateRangeChange}
            maxDate={new Date()}
            inline
          />
      </div>
    );
  }

export default Calendar
