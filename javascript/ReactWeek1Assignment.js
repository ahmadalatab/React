class Student {
    constructor(name, email, community) {
        this.name = name;
        this.email = email;
        this.community = community;
    }

}
class Bootcamp {
    constructor(name, level, students=[]) {
        this.name = name;
        this.level = level;
        this.students = students;
    }
    registerStudent = function(student){
        const isExisiting = this.students.filter(studentexist => studentexist.email === student.email).length === 1;
        if (isExisiting === false) {
            this.students.push(student);
            console.log(`Registering ${student.email} to the bootcamp Web Dev Fundamentals`);
        } else {
            console.log("Email already exists.");
        }
        return this.students;
    }
}

const student1 = new Student("ahmad", "ahmad@gmail.com", "bootcamp");
const bootcamp1 = new Bootcamp ("html", "advanced");
const student2 = new Student ("jesenia", "jesenia@gmail.com", "bootcamp");
