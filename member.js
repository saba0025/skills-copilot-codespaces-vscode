function skillsMember() {
    var member = this;
    member.skills = [];
    member.addSkill = function(skill) {
        member.skills.push(skill);
    };
    member.removeSkill = function(skill) {
        member.skills.splice(member.skills.indexOf(skill), 1);
    };
    return member;
}