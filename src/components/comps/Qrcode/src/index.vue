<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>
<script>
  import { defineComponent, watchEffect, ref, unref } from 'vue';
  import { toCanvas } from './qrcodePlus';
  import { toDataURL } from 'qrcode';
  import { downloadByUrl } from '@/config/utils/file/download';

  export default defineComponent({
    name: 'QrCode',
    props: {
      value: {
        type: [String, Array],
        default: null,
      },
      // 参数
      options: {
        type: Object,
        default: null,
      },
      // 宽度
      width: {
        type: Number,
        default: 200,
      },
      // 中间logo图标
      logo: {
        type: [String, Object],
        default: '',
      },
      // img 不支持内嵌logo
      // 'canvas' | 'img'
      tag: {
        type: String,
        default: 'canvas',
        validator: (v) => ['canvas', 'img'].includes(v),
      },
    },
    emits: { done: (url) => !!url, error: (error) => !!error },
    setup(props, { emit }) {
      const wrapRef = ref(null);
      const urlRef = ref('');
      async function createQrcode() {
        try {
          const { tag, value, options = {}, width, logo } = props;
          const renderValue = String(value);
          const wrapEl = unref(wrapRef);

          if (!wrapEl) return;

          if (tag === 'canvas') {
            const url = await toCanvas({
              canvas: wrapEl,
              width,
              logo: logo,
              content: renderValue,
              options: options || {},
            });
            urlRef.value = url;
            emit('done', url);
            return;
          }

          if (tag === 'img') {
            const url = await toDataURL(renderValue, {
              errorCorrectionLevel: 'H',
              width,
              ...options,
            });
            unref(wrapRef).src = url;
            urlRef.value = url;
            emit('done', url);
          }
        } catch (error) {
          emit('error', error);
        }
      }
      /**
       * file download
       */
      function download(fileName) {
        const url = unref(urlRef);
        if (!url) return;
        downloadByUrl({
          url,
          fileName,
        });
      }

      watchEffect(() => {
        setTimeout(() => {
          createQrcode();
        }, 30);
      });

      return { wrapRef, download };
    },
  });
</script>
