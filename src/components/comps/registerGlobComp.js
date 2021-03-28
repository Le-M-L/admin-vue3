// import Icon from './Icon/index';
// import { Button } from './Button';
import {
  // Need
  Button as AntButton,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
