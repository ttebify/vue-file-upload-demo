<template>
  <div>
    <h1>Vue File Upload Example</h1>
    <file-upload
      ref="upload"
      post-action="http://localhost:3000/upload"
      accept="image/png,image/gif,image/jpeg,image/webp"
      :headers="{ Accept: 'application/json' }"
      :multiple="true"
      :drop="true"
      :auto-upload="false"
      @input-file="handleFileChange"
    >
      <template v-slot:default="{ open, isOver }">
        <div
          class="custom-drag-drop"
          :class="{ 'drag-over': isOver }"
          @dragenter.prevent="isOver = true"
          @dragleave.prevent="isOver = false"
          @dragover.prevent
        >
          <i class="fa fa-cloud-upload"></i>
          <p>Drag & Drop your files here</p>
          <button @click="open">Select Files</button>
        </div>
      </template>
    </file-upload>

    <!-- Error message -->
    <div v-if="uploadError" class="error-message">
      {{ uploadError }}
    </div>

    <!-- Start and stop buttons -->
    <div class="upload-buttons">
      <button
        v-if="!$refs.upload || !$refs.upload.active"
        @click="$refs.upload.active = true"
        class="start-button"
      >
        Start Upload
      </button>
      <button
        v-else
        @click="$refs.upload.active = false"
        class="stop-button"
      >
        Stop Upload
      </button>
    </div>

    <div v-if="uploadedFiles.length > 0">
      <h2>Uploaded Files:</h2>
      <ul>
        <li v-for="(file, index) in uploadedFiles" :key="index">
          {{ file.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueUploadComponent from "vue-upload-component";

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
    };
  },
  components: {
    FileUpload: VueUploadComponent,
  },
  methods: {
    handleFileChange(newFile, oldFile) {
      if (newFile && oldFile) {
        // When a file's status changes
        if (newFile.success !== oldFile.success) {
          this.handleSuccess(newFile);
        } else if (newFile.error !== oldFile.error) {
          this.handleError(newFile.error, newFile);
        }
      }
    },
    handleSuccess(file) {
      this.uploadedFiles.push(file);
    },
    handleError(err, file) {
      console.error(`Error uploading ${file.name}:`, err);
      this.uploadError = `Error uploading ${file.name}: ${err}`;
    },
  },
};
</script>

<style>
.custom-drag-drop {
  border: 2px dashed #ccc;
  background-color: #f5f5f5;
  text-align: center;
  padding: 20px;
  color: #777;
  cursor: pointer;
}

.custom-drag-drop i {
  font-size: 48px;
  margin-bottom: 10px;
}

.drag-over {
  border-color: #2196f3;
  background-color: #e3f2fd;
}

.upload-buttons {
  display: flex;
  margin: 20px 0;
}

.error-message {
  color: red;
  margin-top: 20px;
}

.start-button,
.stop-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  font-weight: bold;
}

.stop-button {
  background-color: #ff5722;
}

.start-button:hover,
.stop-button:hover {
  background-color: #45a049;
}
</style>
