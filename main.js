//-------------------------------------------------------------------------------------------------------------------------------------------
// Метод Vue.component позволяет использовать на странице несколько одинаковых блоков с разными данными. Он принимает два аргумента:
// название компонента, которое станет его HTML-тегом – пусть будет tweet;
// объект конфигурации со всей логикой.
Vue.component('tweet', {
    //название атрибута, через который будет передаваться текст в посты
    props: ['tweetText', 'img', 'name', 'link', 'data'],
    //data - функция, которая возвращает объект
    data: function () {
        return {
            charactersRemaining: 280,
            commentText: '',
            liked: false
        }
    },
    methods: {
        countCharacters: function () {
            this.charactersRemaining = 280 - this.commentText.length
        },

        toggleLike: function () {
            this.liked = !this.liked
        }
    },
    //шаблон, который будет встраиваться
    template: `<div class="status">
        <div class="tweet-content">
          <img v-bind:src='img' class="logo">
          <div class="tweet">
            <a href="#">{{ name }}</a>
            <span>{{ link }} · {{ data }}</span>
            <p class="tweet-text">
              {{ tweetText }}
            </p>
            <div class="reactions like" v-on:click='toggleLike'>
              <span class="like">
                <!--v-if - директива для отображения элемента-->
                <span v-if='liked'>&#10084;</span>
                <!--v-else - альтернативный вариант вывода-->
                <span v-else>&#9825;</span>
              </span>
            </div>
          </div>
        </div>
        <div class="comment-bar">
          <!--v-model - директива, которая связывается со свойством commentText из js-файла-->
          <!--v-on - дирекстива для привязки методов на события, как addEventListener-->
          <textarea placeholder="tweet your reply"
          v-model='commentText'
          v-on:input='countCharacters'
          ></textarea>
          <span class="characters-remaining">
            {{ charactersRemaining }} characters remaining
          </span>
        </div>
      </div>`
})

new Vue({
    el: '#app',
    data: {
        tweets: [
            { id: 1, tweetText: 'hello world!', img: 'https://avatarko.ru/img/avatar/1/zhivotnye_pesik.jpg', name: 'IvanIvanov', link: '@IvanIvanov', data: moment('2018-01-10').format("MMMM Do YYYY, h:mm:ss a")},
            { id: 2, tweetText: 'hi!', img: 'https://avatarko.ru/img/avatar/2/zhivotnye_kot_sneg_1544.jpg', name: 'VasyaPupkin', link: '@VasyaPupkin', data: moment('2017-10-26').format("MMMM Do YYYY, h:mm:ss a")},
            { id: 3, tweetText: 'welcome to my hello-world-app', img: 'https://avatarko.ru/img/avatar/14/zhivotnye_leopard_13346.jpg', name: 'PoligrafPoligrovich', link: '@PoligrafPoligrovich', data: moment('2019-04-25').format("MMMM Do YYYY, h:mm:ss a")},
            { id: 4, tweetText: 'have a nice day!', img: 'https://avatarko.ru/img/avatar/22/zhivotnye_tigr_21710.jpg', name: 'PetyaPiatochkin', link: '@PetyaPiatochkin', data: moment('2018-06-05').format("MMMM Do YYYY, h:mm:ss a")},
            { id: 5, tweetText: 'good luck!', img: 'https://avatarko.ru/img/avatar/21/zhivotnye_kot_lampochka_20490.jpg', name: 'Vasilisa', link: '@Vasilisa', data: moment('2019-03-01').format("MMMM Do YYYY, h:mm:ss a")}
        ]
    }
})
