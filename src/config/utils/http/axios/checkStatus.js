// @ts-nocheck
import { useMessage } from '@/config/hooks/web/useMessage';
import router from '@/router';
import { PageEnum } from '@/config/enums/pageEnum';

const { createMessage } = useMessage();

const error = createMessage.error;
export function checkStatus(status, msg) {
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      error('errMsg401');
      router.push(PageEnum.BASE_LOGIN);
      break;
    case 403:
      error('403');
      break;
    // 404请求不存在
    case 404:
      error('404');
      break;
    case 405:
      error('405');
      break;
    case 408:
      error('408');
      break;
    case 500:
      error('500');
      break;
    case 501:
      error('501');
      break;
    case 502:
      error('502');
      break;
    case 503:
      error('503');
      break;
    case 504:
      error('504');
      break;
    case 505:
      error('505');
      break;
    default:
  }
}
