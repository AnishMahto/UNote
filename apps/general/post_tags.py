ACCEPTED = "ACCEPTED"
REJECTED = "REJECTED"
WAITLISTED = "WAITLISTED"

POST_TAGS = [
    (ACCEPTED, "Accepted"),
    (REJECTED, "Rejected"),
    (WAITLISTED, "Waitlist"),
]

COLORS = {
    ACCEPTED:"green",
    REJECTED:"red",
    WAITLISTED:"yellow"
}

GET_TAGS_DATA = [ {"value": tag[0], "label": tag[1], "color": COLORS[tag[0]]} for tag in POST_TAGS ]