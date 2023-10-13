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
  <!-- Display the uploaded file -->
  <img v-if="imageUrl" :src="imageUrl" alt="Uploaded file" />
</template>

<script>
import { IKUpload, IKCore } from "imagekit-vue3";

const publicKey = process.env.VUE_APP_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.VUE_APP_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = process.env.VUE_APP_AUTHENTICATION_ENDPOINT;

export default {
  name: "ImageKitExample",
  data() {
    return {
      publicKey,
      urlEndpoint,
      authenticationEndpoint,
      imageUrl: "",
    };
  },
  components: {
    IKUpload,
  },
  methods: {
    handleSuccess(result) {
      console.log(result);
      // Generate optimized and transformed URLs for the uploaded files
      const imagekit = new IKCore({
        urlEndpoint: this.urlEndpoint,
        publicKey: this.publicKey,
      });

      this.imageUrl = imagekit.url({
        path: result.filePath,
        transformation: [{ height: 300, width: 400 }],
      });

      console.log(this.imageUrl);
    },
    handleError(err) {
      console.error(err);
    },
  },
};
</script>
