export const ipConfirm = (req, res, next) => {
  const clientIp = req.header("x-auth-ip");
  let reqIp = req.attributeIp;
  console.log("clientIp : ", clientIp, "attributeIp : ", reqIp);
  try {
    if (
      reqIp === process.env.SERVER ||
      reqIp === process.env.LOCAL_SERVER_1 ||
      reqIp === process.env.LOCAL_SERVER_2 ||
      reqIp === process.env.LOCAL_SERVER_3
    ) {
      console.log("관리자 맞음");
      req.body = Object.assign(req.body, { ip: true, reqIp: reqIp });
      next();
    } else {
      console.log("관리자 아님");
      req.body = Object.assign(req.body, { ip: true, reqIp: reqIp });
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "이상한 문제" });
  }
};
