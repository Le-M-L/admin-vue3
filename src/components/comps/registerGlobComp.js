// import Icon from './Icon/index';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
} from 'ant-design-vue';

const compList = [AntButton.Group, Button];

export function registerGlobComp(app) {
  // 添加到全局
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
