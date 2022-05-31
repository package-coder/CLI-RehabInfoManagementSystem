from django.urls import path, include
from knox import views as knox_views

from . import views

urlpatterns = [
    path("users/", views.UserList.as_view(), name="UserList"),
    path("manage/users/<int:pk>", views.UserDetail.as_view(), name="UserDetail"),
    path("employees/", views.EmployeeList.as_view(), name="EmployeeList"),
    path("manage/employees/<int:pk>", views.EmployeeDetail.as_view(), name="EmployeeDetail"),
    path("patients/", views.PatientList.as_view(), name="PatientList"),
    path("manage/patients/<int:pk>", views.PatientDetail.as_view(), name="PatientDetail"),
    path("rooms/", views.RoomList.as_view(), name="RoomList"),
    path("manage/rooms/<int:pk>", views.RoomDetail.as_view(), name="RoomDetail"),
    path("auth/", include([
        path('login/', views.LoginView.as_view()),
        path('logout/', knox_views.LogoutView.as_view())
    ])),
]