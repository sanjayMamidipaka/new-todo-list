function withinHour(dateZulu) {
    const differenceInDate = new Date().getTime() + 3600000 - new Date(dateZulu).getTime();
    console.log(differenceInDate);

    /* 
        Possibilities:
            - if difference is negative, that means event is scheduled after one hour from now (return false)
            - if difference is greater than 3600000, that means event is scheduled in the past (this should throw an error!!) @Sanjay
            - if difference is equal to 0, then event is schedule exactly an hour away from now (return true)
    */
    return differenceInDate >= 0;
}



module.exports = withinHour