
 export const blockServer = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); 
    const hour = currentDate.getHours();

    if (
        (day === 5 && hour < 12) || 
        (day === 6) || 
        (day === 0 && hour < 22) 
    ) {
        return res.status(403).send('Access is blocked .');
    }

    next(); 

}
