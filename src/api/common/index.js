import request from "@/utils/request";

export const upload = (formData) => {
  return request({
    url: "/common/oss/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    formData,
  });
};
