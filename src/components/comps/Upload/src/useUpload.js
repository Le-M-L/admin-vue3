import { unref, computed } from 'vue';
export function useUploadType({
  acceptRef,
  //   uploadTypeRef,
  helpTextRef,
  maxNumberRef,
  maxSizeRef,
}) {
  // 文件类型限制
  const getAccept = computed(() => {
    // const uploadType = unref(uploadTypeRef);
    const accept = unref(acceptRef);
    if (accept && accept.length > 0) {
      return accept;
    }
    return [];
  });
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => `.${item}`)
      .join(',');
  });
  // 支持jpg、jpeg、png格式，不超过2M，最多可选择10张图片，。
  const getHelpText = computed(() => {
    const helpText = unref(helpTextRef);
    if (helpText) {
      return helpText;
    }
    const helpTexts = [];

    const accept = unref(acceptRef);
    if (accept.length > 0) {
      helpTexts.push(`accept${accept.join(',')}`);
    }

    const maxSize = unref(maxSizeRef);
    if (maxSize) {
      helpTexts.push(`单个文件不超过${maxSize}MB`);
    }

    const maxNumber = unref(maxNumberRef);
    if (maxNumber && maxNumber !== Infinity) {
      helpTexts.push(`最多只能上传${maxNumber}个文件`);
    }
    return helpTexts.join('，');
  });
  return { getAccept, getStringAccept, getHelpText };
}
