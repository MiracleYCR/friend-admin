import request from "@/utils/request";

export const getPolicyDetail = (postData = {}) => {
  return request({
    url: "/system/documents/get/document/detail",
    method: "post",
    data: postData,
  });
};

export const updatePolicyData = (postData = {}) => {
  return request({
    url: "/system/documents",
    method: "put",
    data: postData,
  });
};
