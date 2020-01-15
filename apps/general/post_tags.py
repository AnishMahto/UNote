PROF_NOTES = "PROF_NOTES"
USER_NOTES = "USER_NOTES"
WAITLISTED = "WAITLISTED"

POST_TAGS = [
    (PROF_NOTES, "Prof Notes"),
    (USER_NOTES, "User Notes"),
]

COLORS = {
    PROF_NOTES:"green",
    USER_NOTES:"yellow",
}

GET_TAGS_DATA = [ {"value": tag[0], "label": tag[1], "color": COLORS[tag[0]]} for tag in POST_TAGS ]