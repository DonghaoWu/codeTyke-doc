### Responsive Layout

1. For 768px and less:
Answers are arranged in a grid of 2x2 elements.

`Location:./client/src/components/LearningModule/Styles.scss`

```scss
&__selections{ 
    padding: 30px 5px;
    display: flex;

    @media only screen and (max-width: $tablet) {
        justify-content: center; // add
        flex-wrap: wrap; // add
    }
}
```

`Location:./client/src/components/selectionBox/Styles.scss`

```scss
@media only screen and (max-width: $tablet) {
    width: 40%; // add
    max-width: 230px; // add
    margin:1%; // add

    &__image {
        margin:5%;
        width: 90%; 
    }

    &__checkboxTextContainer{
        margin:5%;
        width: 90%; 
        display: flex;
        justify-content: flex-start;
    }
    input { position: relative; left:1px;}
}
```

2. For 420px and less:

- Don't display the subheader on each question. 

`Location:./client/src/components/LearningModule/Styles.scss`

```scss
&__subHeader{
    @include subheader;
    min-height: 42px;

    @media only screen and (max-width: $mobile) {
        display: none; // add
    }
}
```

- White container for the answers is removed.

`Location:./client/src/components/LearningModule/Styles.scss`

```scss
&__answerArea {
    background-color: white;
    box-shadow: 0px 0px 20px -15px;
    padding: 0px 0px 20px 0;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: $tablet) {
        border-radius: unset;
    }

    @media only screen and (max-width: $mobile) {
        background-color: transparent; // add
        box-shadow: 0px 0px 0px 0px; // add
    }
}
```

- Button for answer submission is full-width.

`Location:./client/src/components/LearningModule/Styles.scss`

```scss
&__submitButtonContainer {
    width:90%; // add
    height: 50px;
    margin:0 5%;
    .submitButton {
        float: right;
    }

    @media only screen and (max-width: $mobile) {
        .submitButton {
            float: none; // add
        }
    }
}
```

- Center the logo in the navbar.

`Location:./client/src/components/Navbar/Styles.scss`

```scss
#navbarContainer{
  height: 50px;
  background: black;

  @media only screen and (max-width: $mobile) {
    display:flex; // add
    justify-content: center; // add
  }
}
```

- Align the title to the left.

`Location:./client/src/components/LearningModule/Styles.scss`

```scss
&__title {
    margin: 25px 10px;
    color: $morning-sky;
    font-weight: 600;
    font-size: 1.5em;

    @media only screen and (max-width: $mobile) {
        text-align: left; // add
    }
}
```

#### 备注：
1. 在本修改中，还有一个修改 html 部分的位置在`/selectionBox/Styles.scss`，增加了一个新的 div -- `calssName='selectionBox__checkboxTextContainer'`，所以要结合两个文件（`SelectionBox.js` 和 `Styles.scss`）才能理解整体的变化。