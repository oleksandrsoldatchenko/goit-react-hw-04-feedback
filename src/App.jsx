// Рефакторінг під ДЗ №4
// import React, { Component } from 'react';

// Додаємо для ДЗ №4 useState
import { useState } from 'react';

import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';

// Для дз №4 виносимо варіанти кнопок у окремий файл
import { nameBtn } from './components/services/BtnOptions';

// Виконуємо заміну class App на function App()

function App() {
  // Запис хуків на useState
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    let label = event.target.textContent;
    switch (label) {
      case 'good':
        setGood(prevGood => (prevGood += 1));
        break;
      case 'neutral':
        setNeutral(prevNeutral => (prevNeutral += 1));
        break;
      case 'bad':
        setBad(prevBad => (prevBad += 1));
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const percent = Math.round((good / countTotalFeedback()) * 100) || 0;

    return percent;
  };

  // Замість render одразу записуємо return
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={nameBtn}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      </Section>
    </>
  );
}


// class App extends Component {
//   // Базовий стан застосунку відповідно до вимоги завдання
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   // Метод, що бере назву кнопок і по ним додає 1 до стейту
//   onLeaveFeedback = event => {
//     const label = event.target.textContent;
//     this.setState(prevState => ({ [label]: (prevState[label] += 1) }));
//   };

//   // Метод, що підсумовує значення відгуків в стейті
//   countTotalFeedback = () => {
//     const total = Object.keys(this.state).reduce(
//       (acc, value) => acc + this.state[value],
//       0
//     );
//     return total;
//   };

//   // Метод, що рахує процент добрих відгуків (добрі помножуються на 100 і ділимо на загальну кількість)
//   countPositiveFeedbackPercentage = () => {
//     const percent = Math.round(
//       (this.state.good * 100) / this.countTotalFeedback()
//     );
//     return percent;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;

//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={this.state} // Передача в компонент кнопок весь state
//             onLeaveFeedback={this.onLeaveFeedback} // Метод для назви кнопок і інкремента
//           />
//         </Section>
//         <Section title="Statistics">
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={this.countTotalFeedback} // Передаємо в компонент статистики підрахунок всіх відгуків
//             positivePercentage={this.countPositiveFeedbackPercentage} // Передаємо в той самий компонент статистики підрахунок гарних відгуків
//           />
//         </Section>
//       </>
//     );
//   }
// }

export default App;