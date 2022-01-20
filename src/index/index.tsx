import { Button } from "antd";
import styles from './style.module.scss';

const App = () => {
  const heee = () => console.log(123);
  return (
    <div className={styles.container}>
      <Button.Group>
        <Button onClick={heee} type="primary">1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </Button.Group>
    </div>
  );
};

export default App;
