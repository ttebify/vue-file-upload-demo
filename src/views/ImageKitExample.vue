<template>
  <i-k-upload
    :useUniqueFileName="true"
    :onSuccess="handleSuccess"
    :onError="handleError"
    :publicKey="publicKey"
    :urlEndpoint="urlEndpoint"
    :authenticationEndpoint="authenticationEndpoint"
  >
    <button>Upload</button>
  </i-k-upload>
</template>

<script>
import { IKUpload } from "imagekitio-vue";

export default {
  name: "ImageKitExample",
  data() {
    return {
      publicKey: process.env.VUE_APP_IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.VUE_APP_IMAGEKIT_URL_ENDPOINT,
      authenticationEndpoint: process.env.VUE_APP_AUTHENTICATION_ENDPOINT,
    };
  },
  components: {
    IKUpload,
  },
  methods: {
    handleSuccess(result) {
      console.log(result);
    },
    handleError(err) {
      console.error(err);
    },
  },
};
</script>
