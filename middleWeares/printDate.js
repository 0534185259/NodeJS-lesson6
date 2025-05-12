/**
 * @description Middleware to print the current date
 */
export const printDate = (req, res, next) => {
  if (req.method === 'GET') {
    console.log('date:', req.currentdate); 
  next();
};
}
     
