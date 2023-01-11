import React, { Component } from 'react';
import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';

class App extends Component {
  // Базовий стан застосунку відповідно до вимоги завдання
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // Метод, що бере назву кнопок і по ним додає 1 до стейту
  onLeaveFeedback = event => {
    const label = event.target.textContent;
    this.setState(prevState => ({ [label]: (prevState[label] += 1) }));
  };

  // Метод, що підсумовує значення відгуків в стейті
  countTotalFeedback = () => {
    const total = Object.keys(this.state).reduce(
      (acc, value) => acc + this.state[value],
      0
    );
    return total;
  };

  // Метод, що рахує процент добрих відгуків (добрі помножуються на 100 і ділимо на загальну кількість)
  countPositiveFeedbackPercentage = () => {
    const percent = Math.round(
      (this.state.good * 100) / this.countTotalFeedback()
    );
    return percent;
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state} // Передача в компонент кнопок весь state
            onLeaveFeedback={this.onLeaveFeedback} // Метод для назви кнопок і інкремента
          />
        </Section>
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={this.countTotalFeedback} // Передаємо в компонент статистики підрахунок всіх відгуків
            positivePercentage={this.countPositiveFeedbackPercentage} // Передаємо в той самий компонент статистики підрахунок гарних відгуків
          />
        </Section>
      </>
    );
  }
}

export default App;