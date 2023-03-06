import classes from './logistics-item.module.css';
import { ElementType, PropsWithChildren, ReactElement, ReactNode } from 'react'

type LogisticsItemProps = PropsWithChildren<{icon:ElementType}>

function LogisticsItem({children, icon : Icon}:LogisticsItemProps) {

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon/>
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
