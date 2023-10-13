<template>
  <h1>Composition API Example</h1>
  <input
    type="file"
    @change="onFileChange"
    :disabled="uploadStatus === 'uploading'"
    multiple
  />
  <button @click="uploadFiles" :disabled="uploadStatus === 'uploading'">
    Upload
  </button>
  <!-- Show a success message when the file is uploaded successfully -->
  <div v-if="uploadStatus === 'uploaded'" class="success-message">
    File uploaded successfully!
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

function useFileUpload() {
  const files = ref(null);
  const uploadStatus = ref("idle");

  const onFileChange = (e) => {
    files.value = e.target.files;
    uploadStatus.value = "files selected";
  };

  const uploadFiles = async () => {
    uploadStatus.value = "uploading";

    let formData = new FormData();
    for (let i = 0; i < files.value.length; i++) {
      formData.append("file", files.value[i]);
    }

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      uploadStatus.value = "uploaded";
    } catch (error) {
      console.error(error);
      uploadStatus.value = "error";
    }
  };

  return { files, uploadStatus, onFileChange, uploadFiles };
}

export default {
  setup() {
    const { files, uploadStatus, onFileChange, uploadFiles } = useFileUpload();

    return { files, uploadStatus, onFileChange, uploadFiles };
  },
};
</script>

<style>
.success-message {
  color: green;
}
</style>
