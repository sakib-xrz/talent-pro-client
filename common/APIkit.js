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

  public: {
    job: {
      getSingleJob: (uid) => {
        const url = `/public/job/${uid}`;
        return client.get(url);
      },
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

    getCandidateProfile: () => {
      const url = "/me/profile";
      return client.get(url);
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

    job: {
      getJob: (queryString) => {
        const url = `me/job${queryString}`;
        return client.get(url);
      },
      getSingleJob: (uid) => {
        const url = `me/job/${uid}`;
        return client.get(url);
      },

      saved: {
        getSaveJobs: (queryString) => {
          const url = `me/job/saved${queryString}`;
          return client.get(url);
        },
        getSaveJobsList: () => {
          const url = "/me/job/saved/list";
          return client.get(url);
        },
        postSaveJob: (uid) => {
          const url = `/me/job/saved/${uid}`;
          return client.post(url);
        },
        removeSaveJob: (uid) => {
          const url = `/me/job/saved/${uid}`;
          return client.delete(url);
        },
      },

      application: {
        applyJob: (uid, payload) => {
          const url = `me/job/${uid}/apply`;
          return client.post(url, payload, defaultFileUploadConfig);
        },
        getAppliedJobs: (queryString) => {
          const url = `me/job/applied-job${queryString}`;
          return client.get(url);
        },
        getSingleApplication: (uid) => {
          const url = `me/job/applied-job/${uid}`;
          return client.get(url);
        },
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

    job: {
      getJob: (queryString) => {
        const url = `we/job${queryString}`;
        return client.get(url);
      },
      getSingleJob: (uid) => {
        const url = `we/job/${uid}`;
        return client.get(url);
      },
      postJob: (payload) => {
        const url = "we/job";
        return client.post(url, payload);
      },
      updateJob: (uid, payload) => {
        const url = `/we/job/${uid}`;
        return client.patch(url, payload);
      },
      updateJobStatus: (uid, payload) => {
        const url = `/we/job/${uid}/status`;
        return client.patch(url, payload);
      },
      removeJob: (uid) => {
        const url = `/we/job/${uid}`;
        return client.delete(url);
      },

      application: {
        getAllApplicationForJob: (uid, queryString) => {
          const url = `/we/job/${uid}/application${queryString}`;
          return client.get(url);
        },
        getAllApplicationForOrg: (queryString) => {
          const url = `/we/job/application${queryString}`;
          return client.get(url);
        },
        getSingleApplication: (jobId, applicationId) => {
          const url = `/we/job/${jobId}/application/${applicationId}`;
          return client.get(url);
        },
      },
    },
  },
};

export default APIKit;
