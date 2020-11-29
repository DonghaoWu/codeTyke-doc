### Responsive Layout

1. For 768px and less:
Answers are arranged in a grid of 2x2 elements.

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```

2. For 420px and less:

- Don't display the subheader on each question. 

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```

- White container for the answers is removed.

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```

- Button for answer submission is full-width.

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```

- Center the logo in the navbar.

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```

- Align the title to the left.

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
    @media only screen and (max-width: $tablet) {
      width: 40%;
      max-width: 230px;
      margin:1%;
      &__image {
        margin:5%;
        width: 90%; 
      }
    }
```