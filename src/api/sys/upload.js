import { defHttp } from '@/config/utils/http/axios';
import { useGlobSetting } from '@/config/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(params, onUploadProgress) {
  return defHttp.uploadFile(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}
