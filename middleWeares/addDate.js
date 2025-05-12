export const addCurrentDate  = (req, res, next) => {
    req.currentdate=new Date().toLocaleString()
    next();
}