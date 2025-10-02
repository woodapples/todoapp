package main.java.com.github.woodapples.todoapp;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

/**
 * Simple Integration Tests für Todo API
 */
@QuarkusTest
public class TodoResourceTest {

    @Test
    public void testGetAllTodos() {
        given()
          .when().get("/api/todos")
          .then()
             .statusCode(200)
             .contentType(ContentType.JSON);
    }

    @Test
    public void testCreateTodo() {
        String todoJson = """
            {
                "title": "Test Todo",
                "description": "Das ist ein Test"
            }
            """;

        given()
          .contentType(ContentType.JSON)
          .body(todoJson)
          .when().post("/api/todos")
          .then()
             .statusCode(201)
             .body("title", is("Test Todo"))
             .body("completed", is(false))
             .body("id", notNullValue());
    }

    @Test
    public void testCreateTodoWithoutTitle() {
        String todoJson = """
            {
                "description": "Kein Title"
            }
            """;

        given()
          .contentType(ContentType.JSON)
          .body(todoJson)
          .when().post("/api/todos")
          .then()
             .statusCode(400);  // Validation Error
    }

    @Test
    public void testGetActiveTodos() {
        given()
          .queryParam("status", "active")
          .when().get("/api/todos")
          .then()
             .statusCode(200)
             .contentType(ContentType.JSON);
    }

    @Test
    public void testGetCompletedTodos() {
        given()
          .queryParam("status", "completed")
          .when().get("/api/todos")
          .then()
             .statusCode(200)
             .contentType(ContentType.JSON);
    }

    @Test
    public void testSearchTodos() {
        given()
          .queryParam("q", "Test")
          .when().get("/api/todos/search")
          .then()
             .statusCode(200)
             .contentType(ContentType.JSON);
    }

    @Test
    public void testGetNonExistentTodo() {
        given()
          .when().get("/api/todos/507f1f77bcf86cd799439011")
          .then()
             .statusCode(404);
    }
}