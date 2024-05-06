HI.

This app is based on level-2 assignment-4.

Special request to honourable examiner: If you something wrong plz look into code for relevent comments which clearify your doubt.

To use my web app plz follow below guidelines:

To create new Course you have to send course data in courseData object( shown below) via create Course endPoint:

1. User Registration
   Method:POST(http://localhost:5000/api/auth/register)

I make role optional in zod validation . Because role has a default value ('user') in user model in requirement.

PostMan Request Body example:

        {
            "username": "john_doe",
            "email": "john@example.com",
            "password": "123456",
            "role": "user"
        }

2.  User Login
    Method: POST(http://localhost:5000/api/auth/login)

    postMan request Body example:

         {
             "username": "john_doe",
             "password": "123456"
         }

3.  Change Password
    Method: POST(http://localhost:5000/api/auth/change-password)

    If current password didn't match . Then it throw AppError saying that current password not matched.

    If JWT token issued before lastpassword change then it throw AppError saying that Login Expired!

    It response like below if password change rules violated:

        {
            "success": false,
            "statusCode": 400,
            "message": "Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).",
            "data": null
        }

postMan Request Body example:

        {
            "currentPassword": "123456",
            "newPassword": "new123456"
        }

4.  Create a Course (Only Admin can do this)
    Method: POST(http://localhost:5000/api/courses)

    postMan:

    Request Headers: Authorization: <ADMIN_JWT_TOKEN>

    Request Body example:

         {
             "title": "Introduction to Web Development",
             "instructor": "John Smith",
             "categoryId": "12345abcde67890fghij",
             "price": 49.99,
             "tags": [
                 {"name": "Programming", "isDeleted": false},
                 {"name": "Web Development", "isDeleted": false}
             ],
             "startDate": "2023-02-01",
             "endDate": "2023-04-01",
             "language": "English",
             "provider": "Tech Academy",
             "durationInWeeks": 8,
             "details": {
                 "level": "Beginner",
                 "description": "A comprehensive introduction to web development."
             }
         }

5.  Get Paginated and Filtered Courses.
    Method: GET(http://localhost:5000/api/courses)

    Note that : when filtering by startDate & endDate , remember only those courses are filtered which start and end between the query date range.

6.  Create a Category (Only Admin can do this)
    Method: POST(http://localhost:5000/api/categories)

    postMan:
    Request Headers: Authorization: <ADMIN_JWT_TOKEN>

    Request Body example:

        {
            "name": "Web Development"
        }

7.  Get All Categories
    Method:GET(http://localhost:5000/api/categories)

8.  Create a Review (Only the user can do this)

    Method: POST(http://localhost:5000/api/reviews)

    rating must be given in between 1-5.

    postMan:

    Request Headers: Authorization: <USER_JWT_TOKEN>

    Request Body example:

        {
            "courseId": "67890fghij54321abcde",
            "rating": 4,
            "review": "Great course, very informative and well-structured."
        }

9.  Update Course(Only Admin can do this)
    Methods: PUT(http://localhost:5000/api/courses/:courseId)

    postMan:

    Request Headers: Authorization: <ADMIN_JWT_TOKEN>

    Request Body example:

        {
            "price": 59.99,
            "tags": [
                {"name": "Programming", "isDeleted": false},
                {"name": "Web Development", "isDeleted": false},
                {"name": "JavaScript", "isDeleted": false}
            ],
            "details": {
                "level": "Intermediate",
                "description": "A comprehensive course on web development with a focus on JavaScript."
            }
        }

10. Get Course by ID with Reviews
    Methods: GET(http://localhost:5000/api/courses/:courseId/reviews)

11. Get the Best Course Based on Average Review (Rating)

Methods: GET(http://localhost:5000/api/course/best)
