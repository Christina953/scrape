import axios from "axios";

let res = await axios.get("https://tahveltp.edu.ee/hois_back/timetableevents/timetableSearch", {
    params: {
        from: '2026-03-02T00:00:00.000Z',
        lang: 'ET',
        page: 0,
        schoolId: 14,
        size: 50,
        studentGroups: '7639d255-6b1a-41dd-9b14-c3e6ffb449ef',
        thru: '2026-03-08T00:00:00.000Z'
    }
});
for(let lesson of res.data.content){
    console.log(lesson.timeStart + ' - ' + lesson.timeEnd + ': ' + lesson.nameEt);
}