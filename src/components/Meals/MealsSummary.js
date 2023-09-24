import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>美味しいものをあなたのもとへ</h2>
      <p>
        メニューの中からお好みのお食事をお選びいただき、ご自宅で美味しいランチやディナーをお楽しみください
      </p>
      <p>
        すべての食事は高品質の食材を使用し、経験豊富なシェフによってジャストインタイムで調理されます。
      </p>
    </section>
  );
};

export default MealsSummary;
