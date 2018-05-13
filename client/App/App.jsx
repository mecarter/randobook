import preact from 'preact';
import 'whatwg-fetch';

import Loading from '../Loading/Loading';
import Month from '../Month/Month';
import MonthSelector from '../MonthSelector/MonthSelector';

class App extends preact.Component {
  state = {
    availableMonths: [],
    color: '#43DD94',
    errorMessage: null,
    isLoading: true,
    months: [],
    selectedMonth: '',
    showMonthSelector: false,
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch('/api/books', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(months => {
        this.setState({
          availableMonths: months.map(m => m.month),
          isLoading: false,
          months,
          selectedMonth: months[0].month,
        });
      })
      .catch(console.warn);
  }

  selectNext = currentSelected => {
    const newSelected = currentSelected + 1;

    this.setState(({ selectedMonth, months }) => ({
      months: months.map(m => ({
        ...m,
        selected: m.month === selectedMonth ? newSelected : m.selected,
      }))
    }));

    fetch(`/api/books/${this.state.selectedMonth}/update_selected/${newSelected}`, { credentials: 'same-origin' })
      .catch(console.warn);
  }

  selectMonth = selectedMonth => {
    this.setState(currentState => ({
      selectedMonth: selectedMonth || currentState.selectedMonth,
      showMonthSelector: false,
    }));
  }

  toggleMonthSelector = () => {
    this.setState(currentState => ({ showMonthSelector: !currentState.showMonthSelector }));
  }

  render() {
    const {
      availableMonths,
      color,
      errorMessage,
      isLoading,
      months,
      selectedMonth,
      showMonthSelector,
    } = this.state;

    return(
      <div>
        {isLoading && <Loading />}
        {!isLoading && !errorMessage && (
          <Month
            selectedMonth={selectedMonth}
            months={months}
            onClickMonth={this.toggleMonthSelector}
            onSelectNext={this.selectNext}
          />
        )}
        {!isLoading && errorMessage && (
          <h1>Something went wrong, please try again.</h1>
        )}
        {showMonthSelector && (
          <MonthSelector
            availableMonths={availableMonths}
            onClose={this.toggleMonthSelector}
            onSelectMonth={this.selectMonth}
          />
        )}
      </div>
    );
  }
};

export default App;
