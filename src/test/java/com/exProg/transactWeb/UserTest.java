package com.exProg.transactWeb;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class UserTest {

    List<String> mock = mock(List.class);

    @Test
    void testEquals() {
    }

    @Test
    void testHashCode() {
    }

    @Test
    void getId() {
        when(mock.size()).thenReturn(5).thenReturn(10);
        assertEquals(5, mock.size());
        assertEquals(10, mock.size());
    }

    @Test
    void setId() {
        when(mock.size()).thenReturn(6);
        assertEquals(5, mock.size());
    }

    @Test
    void getFirstName() {
        when(mock.size()).thenReturn(5).thenReturn(10);
        assertEquals(5, mock.size());
        assertEquals(10, mock.size());
    }

    @Test
    void setFirstName() {
        when(mock.size()).thenReturn(6);
        assertEquals(5, mock.size());
    }

    @Test
    void getLastName() {
        when(mock.size()).thenReturn(5).thenReturn(10);
        assertEquals(5, mock.size());
        assertEquals(10, mock.size());
    }

    @Test
    void setLastName() {
        when(mock.size()).thenReturn(6);
        assertEquals(5, mock.size());
    }

    @Test
    void getDescription() {
        when(mock.size()).thenReturn(5).thenReturn(10);
        assertEquals(5, mock.size());
        assertEquals(10, mock.size());
    }

    @Test
    void setDescription() {
        when(mock.size()).thenReturn(6);
        assertEquals(5, mock.size());
    }

    @Test
    void testToString() {
    }
}