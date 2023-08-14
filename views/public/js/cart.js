const times = [
  { time: "10:00", int: 10 },
  { time: "10:30", int: 10.5 },
  { time: "11:00", int: 11 },
  { time: "11:30", int: 11.5 },
  { time: "12:00", int: 12 },
  { time: "12:30", int: 12.5 },
  { time: "13:00", int: 13 },
  { time: "13:30", int: 13.5 },
  { time: "14:00", int: 14 },
  { time: "14:30", int: 14.5 },
  { time: "15:00", int: 15 },
  { time: "15:30", int: 15.5 },
  { time: "16:00", int: 16 },
  { time: "16:30", int: 16.5 },
  { time: "17:00", int: 17 },
  { time: "17:30", int: 17.5 },
  { time: "18:00", int: 18 },
  { time: "18:30", int: 18.5 },
  { time: "19:00", int: 19 },
  { time: "19:30", int: 19.5 },
  { time: "20:00", int: 20 },
  { time: "20:30", int: 20.5 },
  { time: "21:00", int: 21 },
  { time: "21:30", int: 21.5 },
];

//* Reserved Room CSS <-> backend *//
// $(".se-seat").addEventListener("load", function () {});

/* add cart -> selected items */
$(function () {
  let bookDiv = "";
  $(".sc-seat").on("click", function () {
    const disabled = $(this).toggleClass("select-disabled");
    let selectedSession1 = [],
      selectedSession2 = [],
      selectedSession3 = [];
    let session = $(this).data("sec");
    let selected = "";
    let roomType = "";
    let roomIs = "";

    if ($(this).hasClass("room1")) {
      roomType = "room1";
      roomIs = "A";
      selected = `
      <tr class="items">
      <td>
        <div class="sc-ticket ${roomType}">
          <div class="sc-ticket-stripes"></div>
          <div class="sc-ticket-seat-label">
            <input
              type="hidden"
              name="session"
              value="${session}"
            />${session}
          </div>
          <div class="sc-ticket-seat-type">
          <input
          type="hidden"
          name="facilities"
          value="${roomIs}"
        />${roomIs}</div>
          <div class="sc-ticket-stripes"></div>
        </div>
      </td>
      <td></td>
      <td></td>
      </tr>
      `;
      $(".cart-items").append(selected);
    } else if ($(this).hasClass("room2")) {
      roomType = "room2";
      roomIs = "B1";
      selected = `
      <tr class="items">
      <td>
        <div class="sc-ticket ${roomType}">
          <div class="sc-ticket-stripes"></div>
          <div class="sc-ticket-seat-label">
            <input
              type="hidden"
              name="session"
              value="${session}"
            />${session}
          </div>
          <div class="sc-ticket-seat-type">
          <input
          type="hidden"
          name="facilities"
          value="${roomIs}"
        />${roomIs}</div>
          <div class="sc-ticket-stripes"></div>
        </div>
      </td>
      <td></td>
      <td></td>
      </tr> 
      `;
      $(".cart-items").append(selected);
    } else {
      roomType = "room3";
      roomIs = "B2";
      selected = `
      <tr class="items">
      <td>
        <div class="sc-ticket ${roomType}">
          <div class="sc-ticket-stripes"></div>
          <div class="sc-ticket-seat-label">
            <input
              type="hidden"
              name="session"
              value="${session}"
            />${session}
          </div>
          <div class="sc-ticket-seat-type">
          <input
          type="hidden"
          name="facilities"
          value="${roomIs}"
        />${roomIs}</div>
          <div class="sc-ticket-stripes"></div>
        </div>
      </td>
      <td></td>
      <td></td>
      </tr>
      `;
      $(".cart-items").append(selected);
    }
    //** further use **//
    // selectedSession1.push(session);
    // selectedSession2.push(session);
    // selectedSession3.push(session);
    console.log(session);

    /* delete items */
    // $(".items").click(function () {
    //   // $(".cart-items").children().remove();
    //   $(".sc-seat").removeClass("select-disabled");
    // });

    // html
    // <button class="sc-cart-btn sc-cart-btn-delete" type="button">
    //   <div class="sc-cart-btn-icon"></div>
    //   </button>

    //* Reserved Room CSS */
    // const seatSelected = document.querySelectorAll(".addRoom");
    // seatSelected.forEach((addRoom) => {
    //   addRoom.addEventListener("click", function () {
    //     this.classList.toggle("sc-seat-reserved");
    //   });
    // });

    /* empty cart */
    const clearItems = () => {
      $(".emptyCart").click(function () {
        $(".cart-items").children().remove();
        $(".book-confirm").children().remove();
        $(".sc-seat").removeClass("select-disabled");
        $("#reserve").removeClass("select-disabled");
        location.reload();
        return false;
      });
    };
    clearItems();
    /* render booked times with time-range */
    //* after reload select-disabled != work
    const checkString = () => {
      $("#reserve").on("click", function () {
        $(this).toggleClass("select-disabled");
        $(".cart-items").children().remove();
        const refreshButton = document.querySelector(".res");

        const refreshPage = () => {
          location.reload();
        };
        refreshButton.addEventListener("click", refreshPage);

        const elements = selected;
        $(".book-confirm").append(elements);
      });
      // date format => integer => num
      const session = $(this).data("sec");
      let num = [];
      for (i = 0; i < times.length; i++) {
        if (times[i].time === session) {
          num.push(times[i].int);
          console.log(num);
          return num;
        }
      }
    };
    checkString();
  });
});

//** next step develop => time calculate **//
