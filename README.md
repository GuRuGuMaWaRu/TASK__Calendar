## Test Project - Event Calendar using React/Redux/Express/Mongo

## Requirements
- [ ] Conflicting events should be the same width, and should not overlap.
- [ ] Max event width is 200px.
- [ ] Event background color is #E2ECF5 with #6E9ECF border color.
- [ ] Event font is Open Sans, 14px.
- [ ] Calendar time font is Open Sans with around 200 font weight, 16px large, 12px small.
- [ ] Titles should be 1 line and should not overflow outside the calendar-event box. If the title is too long to fit, ellipsis (“…”) should be used.
- [ ] Events will be between 8am to 5pm (there’s a label for 5pm but events will not exceed 5pm).
- [ ] Calendar will cover only one same day.
- [ ] User should be able to add/remove events from his calendar.
- [ ] User should be able to export his calendar in JSON (specified format).
- [ ] User should be able to login and persist his inputs between logins.

## Thoughts
The hardest part was to render events as per requirements. I'm sure current solution is not the best, but it really took me a lot of effort and many iterations before I came up with the current version. It uses dynamic rendering and relies heavily on changing coordinates for all events according to their place in relation to other events.

## Links
- [ ] this project on Heroku: [https://damp-meadow-56363.herokuapp.com/](https://damp-meadow-56363.herokuapp.com/)

## Video Walkthrough
![](https://github.com/gurugumawaru/TASK__Calendar/blob/master/Test__Event-Calendar.gif)
