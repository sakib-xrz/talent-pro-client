import HTTPKit, { client } from "./HTTPkit";

const defaultFileUploadConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  server: {
    start: () => {
      const url = "/start";
      return client.get(url);
    },
  },

  auth: {
    register: (payload) => {
      const url = "/auth/register";
      return client.post(url, payload);
    },

    token: (payload) => {
      const url = "/auth/token";
      return client.post(url, payload);
    },
  },

  me: {
    getMe: () => {
      const url = "/me";
      return client.get(url);
    },

    updateProfilePicture: (payload) => {
      const url = "/me/image";
      return client.patch(url, payload, defaultFileUploadConfig);
    },

    updateResume: (payload) => {
      const url = "/me/resume";
      return client.patch(url, payload, defaultFileUploadConfig);
    },

    setupProfile: (payload) => {
      const url = "/me/profile";
      return client.post(url, payload, defaultFileUploadConfig);
    },

    info: {
      getInfo: () => {
        const url = "/me/info";
        return client.get(url);
      },

      updateInfo: (payload) => {
        const url = "/me/info";
        return client.patch(url, payload);
      },
    },

    experience: {
      addExperience: (payload) => {
        const url = "/me/experience";
        return client.post(url, payload);
      },
      getExperience: () => {
        const url = "/me/experience";
        return client.get(url);
      },
      updateExperience: (uid, payload) => {
        const url = `/me/experience/${uid}`;
        return client.patch(url, payload);
      },
      deleteExperience: (uid) => {
        const url = `/me/experience/${uid}`;
        return client.delete(url);
      },
    },

    education: {
      addEducation: (payload) => {
        const url = "/me/education";
        return client.post(url, payload);
      },
      getEducation: () => {
        const url = "/me/education";
        return client.get(url);
      },
      updateEducation: (uid, payload) => {
        const url = `/me/education/${uid}`;
        return client.patch(url, payload);
      },
      deleteEducation: (uid) => {
        const url = `/me/education/${uid}`;
        return client.delete(url);
      },
    },

    expertise: {
      getSkillAndExpertise: () => {
        const url = "/me/skills-expertise";
        return client.get(url);
      },
      updateSkillAndExpertise: (payload) => {
        const url = "/me/skills-expertise";
        return client.patch(url, payload);
      },
    },
  },

  we: {
    getWe: () => {
      const url = "/we";
      return client.get(url);
    },
    setupProfile: (payload) => {
      const url = "/we";
      return client.post(url, payload, defaultFileUploadConfig);
    },
  },

  job: {
    postJob: (payload) => {
      const url = "/job";
      return client.post(url, payload);
    },
    getJob: (queryString) => {
      const url = `/job${queryString}`;
      return client.get(url);
    },
    getSingleJob: (uid) => {
      const url = `/job/${uid}`;
      return client.get(url);
    },
    updateJobStatus: (uid, payload) => {
      const url = `/job/update-status/${uid}`;
      return client.patch(url, payload);
    },
  },
};

export default APIKit;
