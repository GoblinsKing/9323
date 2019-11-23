

// for format time
function addZero(n) {
    return n < 10 ? '0' + n : n;
};

// format time
export function formatTime(timestamp) {
    var time = new Date(parseInt(timestamp));
    var Y = time.getFullYear();
    var Mo = time.getMonth() + 1; 
    var D = time.getDate(); 
    var H = time.getHours(); 
    var Mi = time.getMinutes(); 
    var S = time.getSeconds(); 
    var formatYMD = Y + '-' + addZero(Mo) + '-' + addZero(D);
    var formatHMS = addZero(H) + ':' + addZero(Mi) + ':' + addZero(S);
    var formatTime =  formatYMD + ' ' + formatHMS;
    return formatTime;
}

// for sort Threads by time and upvotes
export function sortThreads(courseThreads){
    let upvotes = []
    let highUpvotesThreads = []
    let otherUpvotesThreads = []
    //sort by 'id' and 'up_vote'
    function sortByUpVote(property){
        return function(obj1, obj2){
            var value1 = obj1.get(property)
            var value2 = obj2.get(property)
            return value2 - value1
        }
    }
    //collection all 'up_vote' to detele duplicates and sort 
    courseThreads.forEach(element => {
        upvotes.push(element.get('up_vote'))
    });
    //delete same value in an array 
    function unique(array) {
        var res = [];
        for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, resLen = res.length; j < resLen; j++ ) {
                if (array[i] === res[j]) {
                    break;
                }
            }
            if (j === resLen) {
                res.push(array[i])
            }
        }
        return res;
    }

    function sortNumber(a,b){
        return b - a
    }

    //First, get all 'up_vote' and uniqe, then sort
    //second, if length >= 10, slice top 5, else top2
    //third, according up_vote, distinguish highUpvotesThreads and otherUpvotesThreads
    upvotes =  unique(upvotes).sort(sortNumber)
    if (courseThreads.count() >= 10){
        let highupvotes = upvotes.slice(0, 5)
        courseThreads.forEach(element => {
            if (highupvotes.indexOf(element.get('up_vote')) > -1){
                highUpvotesThreads.push(element) 
            }
            else{
                otherUpvotesThreads.push(element)
            }  
        });
        highUpvotesThreads = highUpvotesThreads.sort(sortByUpVote('up_vote'))
        otherUpvotesThreads = otherUpvotesThreads.sort(sortByUpVote('id')).reverse()
    } else {
        let highupvotes = upvotes.slice(0, 2);
        courseThreads.forEach(element => {
            if (highupvotes.indexOf(element.get('up_vote')) > -1) {
                highUpvotesThreads.push(element)
            }
            else {
                otherUpvotesThreads.push(element)
            } 
        });
        highUpvotesThreads = highUpvotesThreads.sort(sortByUpVote('up_vote'))
        otherUpvotesThreads = otherUpvotesThreads.sort(sortByUpVote('id')).reverse() 
    }
    let sortThreads = [...highUpvotesThreads, ...otherUpvotesThreads]
    return sortThreads
}
