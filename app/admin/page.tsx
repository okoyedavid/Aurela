"use client";
import {
  ChartColumnBigIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  LayoutDashboardIcon,
  PinIcon,
  ShoppingBag,
  ShoppingBasketIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css"; // base styles
import {
  menuItems2,
  statusItems,
  menuItems1,
  menuItems3,
  dashboardItems,
  influencers,
  campaigns,
  campaignItems,
  notifications,
  rightSidebarItems,
} from "./adminFakeData";

function SidebarLeft() {
  const [val, setVal] = useState(false);
  return (
    <div className="fixed left-0 inset-y-0 w-64 flex-col p-4 hidden xl:flex overflow-x-hidden overflow-y-auto">
      <div className="shrink-0  flex items-center  justify-between">
        <img
          src="https://assets.codepen.io/3685267/advertising_dashboard_cfagbejq.png"
          alt=""
          className="h-9"
        />
        <div className="size-8  rounded-full  grid place-items-center  border-2 border-[#252628] color-[#ffff]">
          <ChevronLeftIcon className="size-5" strokeWidth={3} />
        </div>
      </div>
      <div className="shrink-0  bg-[#1b1c20] flex items-center   p-2 rounded-md  mt-3 ">
        <img
          src="https://assets.codepen.io/3685267/advertising_dashboard_moszhizg.png"
          alt=""
          className="size-9  object-center object-cover rounded-full  "
        />
        <div className="ml-2 ">
          <div className="font-semibold text-white">Emma Grace</div>
          <div className="text-[#7a7d82]">Admin account</div>
        </div>
        <EllipsisVerticalIcon
          className="size-4 ml-auto text-[#7a7d82]"
          strokeWidth={3}
        />
      </div>
      <div className=" shrink-0  py-2 mt-3 border-t-2 border-t-zinc-800">
        <button className="w-full flex items-center  space-x-2 bg-[#35383d] p-2 rounded-md text-white">
          <LayoutDashboardIcon className="size-5" />
          <div className="font-semibold">Dashboard</div>
        </button>
      </div>

      <div className="shrink-0  flex flex-col  py-1 border-t-2 border-t-zinc-800">
        {menuItems1.map(({ title, Icon, count }, idx) => (
          <button
            className="flex items-center p-1.5 rounded-md hover:bg-[#1e1e1e]"
            key={idx}
          >
            <Icon className="size-5 text-[#626367]" />
            <div className="ml-2 text-[#c0c4cd]"> {title}</div>
            {count && (
              <div className="grid place-items-center  size-6  bg-[#fae0d1] text-black rounded-md ml-auto ">
                {count}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="grow   flex flex-col  py-1 mt-1 border-t-2 border-t-zinc-800  ">
        {menuItems2.map(({ title, Icon }, idx) => (
          <button
            className="flex items-center  p-1.5 rounded-md hover:bg-[#1e1e1e]"
            key={idx}
          >
            <Icon className="size-5 text-[#626367]" />
            <div className="ml-2 text-[#c0c4cd]"> {title}</div>
          </button>
        ))}
      </div>
      <div className="shrink-0  flex flex-col  py-2 border-t-2 border-t-zinc-800 ">
        {menuItems3.map(({ title, Icon }, idx) => (
          <button
            className="flex items-center  p-1.5 rounded-md hover:bg-[#1e1e1e]"
            key={idx}
          >
            <Icon className="size-5 text-[#626367]" />
            <div className="ml-2 text-[#c0c4cd]"> {title}</div>
          </button>
        ))}
      </div>

      <div className="shrink-0  flex items-center justify-between mt-3">
        <div className="">Language</div>
        <button
          className="w-14 h-7 bg-[#242424] flex items-center  rounded-full  px-1"
          onClick={() => setVal((cur) => !cur)}
        >
          <div
            className="size-5  relative bg-white rounded-full transform transition-transform duration-500"
            style={{
              transform: `translate(${val ? "27px" : "0px"}, 0px)`,
            }}
          >
            <img
              src="https://assets.codepen.io/3685267/advertising_dashboard_dagkrvwl.png"
              alt=""
              className="size-4  object-center object-cover rounded-full  absolute transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lan-img"
              style={{
                opacity: val ? 0 : 1,
              }}
            />
            <img
              src="https://assets.codepen.io/3685267/advertising_dashboard_bbstiyel.png"
              alt=""
              className="size-4  object-center object-cover rounded-full  absolute transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 lan-img"
              style={{
                opacity: val ? 1 : 0,
              }}
            />
          </div>
        </button>
      </div>
      <div
        className="shrink-0 aspect-[4/2] bg-zinc-900 mt-4 rounded-md  bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://assets.codepen.io/3685267/advertising_dashboard_deznkxdp.png)",
          paddingTop: "44px",
        }}
      >
        <div className="text-center text-base font-semibold mt-2 text-black">
          Need Help?
        </div>
        <div className="text-center mt-1 text-[#131313]">
          Our Support is 24/7 Online
        </div>
      </div>
    </div>
  );
}

function SidebarRight() {
  return (
    <div className="fixed  inset-y-0  right-0  w-64 px-4 pb-4 pt-2 hidden xl:block">
      <div className="flex items-center justify-between pb-2 border-b-2 border-b-zinc-800  ">
        {rightSidebarItems.map(({ Icon }, idx) => (
          <div
            className={`size-10  grid place-items-center  rounded-md ${
              idx === 0 ? "sidebar-right-selected" : ""
            }`}
            key={idx}
          >
            <Icon className="size-5" />
          </div>
        ))}
      </div>
      <div className="flex flex-col  space-y-2 mt-3 ">
        {notifications
          .filter((_, j) => j < 5)
          .map(({ title, time, category }, idx) => (
            <div
              className={`p-0.5 rounded-md ${
                idx === 3 ? "notification-selected" : ""
              }`}
              key={idx}
            >
              <div className="bg-zinc-950 p-3 rounded-md  ">
                <div className="text-[#70718e]">{time}</div>
                <div className="mt-1 font-semibold">{title}</div>
                <div className="mt-2 text-[#5b5b5b]">{category}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="px-4 ">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="p-1 bg-[#000000]  rounded-md  mt-1 ">
          <div className="grid grid-cols-3 gap-2">
            {dashboardItems.map(({ title, Icon }, idx) => (
              <div
                className={`py-2 rounded-md  flex items-center  justify-center space-x-2 ${
                  idx === 0 ? "bg-[#35383d]" : ""
                }`}
                key={idx}
              >
                <Icon
                  className={`size-5 ${
                    idx === 0 ? "text-white" : "text-[#575757]"
                  }`}
                />
                <div className=""> {title} </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center  mt-2 px-4">
        <ShoppingBasketIcon className="size-5 text-[#6e7176]" />
        <div className="ml-2 text-base font-semibold">Campaigns</div>
        <div className="inline-flex items-center  ml-auto space-x-3 ">
          <div className="bg-[#35383d] px-2 py-0.5 rounded-md  ">All</div>
          {campaignItems.map(({ title, color }, idx) => (
            <div className="inline-flex items-center  space-x-2 " key={idx}>
              <div
                className="size-2  rounded-full  "
                style={{ background: color }}
              ></div>
              <div className=""> {title} </div>
            </div>
          ))}
          <div className="bg-[#35383d] px-2 py-0.5 rounded-md  ">
            All campaigns
          </div>
        </div>
      </div>
      <CampaignSlider />
    </>
  );
}

function CampaignSlider() {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    swiperRef.current = new SwiperCore(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 40,
    });

    return () => {
      swiperRef.current?.destroy(); // cleanup
    };
  }, []);

  const next1 = () => swiperRef.current?.slideNext();

  return (
    <>
      <div className="mt-3 relative">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {campaigns.map(({ title, redemptions, remaining, color }, idx) => (
              <div
                className="swiper-slide rounded-md  p-3  select-none cursor-pointer campaign-slide"
                key={idx}
                style={{ background: color }}
              >
                <div className="flex items-center  border-b-2 border-b-[#6464648c] pb-2 ">
                  <div className="size-3  rounded-full  bg-[#37363e] "></div>
                  <div className="ml-2 font-semibold text-[#37363e]">
                    {" "}
                    {title}{" "}
                  </div>

                  <EllipsisIcon className="size-5 ml-auto text-[#555]" />
                </div>

                <div className="grid grid-cols-2 mt-3 ">
                  <div>
                    <div className="text-[#555]">Remaining</div>
                    <div className="flex items-center  space-x-2 ">
                      <ClockIcon className="size-4 text-[#555]" />
                      <div className="text-[#37363e] font-semibold">
                        {remaining}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[#555]">Redemptions</div>
                    <div className="flex items-center  space-x-2 ">
                      <div>
                        <ShoppingBag className="size-4 text-[#555]" />
                      </div>
                      <div className="text-[#37363e] font-semibold">
                        {redemptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute  inset-y-0  w-4 z-10"
          style={{
            background:
              "linear-gradient(90deg, #18181B 0%, rgba(24, 24, 27, 0) 100%)",
            left: "0px",
          }}
        ></div>
        <div
          className="absolute  inset-y-0  w-20 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(24, 24, 27, 0) 0%, #18181B 100%)",
            right: "0px",
          }}
        ></div>

        <button
          className="size-9  absolute  rounded-full  z-20 bg-white  grid place-items-center  "
          onClick={next1}
          style={{ right: "8px", top: "32px" }}
        >
          <ChevronRightIcon className="size-5 text-zinc-900" strokeWidth={3} />
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.campaign-slide{
  height:105px;
  width:220px;
}
`,
        }}
      ></style>
    </>
  );
}

function Influencers() {
  return (
    <>
      <div className="flex items-center  px-4 mt-3 ">
        <PinIcon className="size-5 text-[#606165]" />
        <div className="text-base font-semibold ml-2 ">Influencers</div>
        <div className="ml-auto bg-zinc-800 px-2 py-0.5 rounded-md ">
          All Influencers
        </div>
      </div>
      <InfluencerSlider />
    </>
  );
}

function InfluencerSlider() {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    swiperRef.current = new SwiperCore(".mySwiper2", {
      slidesPerView: "auto",
      spaceBetween: 0,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 40,
    });

    return () => {
      swiperRef.current?.destroy(); // cleanup
    };
  }, []);

  const next2 = () => swiperRef.current?.slideNext();

  return (
    <>
      <div className="mt-4 relative">
        <div className="swiper mySwiper2">
          <div className="swiper-wrapper">
            {influencers.map(({ name, image }, idx) => (
              <div
                className="swiper-slide select-none cursor-pointer influencer-slide"
                key={idx}
              >
                <div className="flex items-center justify-center">
                  <div className="border-2 border-zinc-800 rounded-full  p-1  ">
                    <img
                      src={image}
                      alt=""
                      className="size-14  occ rounded-full  "
                    />
                  </div>
                </div>

                <div className="text-center mt-1"> {name} </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute  inset-y-0  w-8 z-10"
          style={{
            background: "linear-gradient(90deg, #000 0%, #00000000 100%)",
            left: "0px",
          }}
        ></div>
        <div
          className="absolute  inset-y-0 w-20 z-10"
          style={{
            background: "linear-gradient(90deg, #00000000 0%, #000 100%)",
            right: "0px",
          }}
        ></div>

        <button
          className="size-9  absolute  rounded-full z-20 bg-white grid place-items-center "
          onClick={next2}
          style={{ right: "8px", top: "17px" }}
        >
          <ChevronRightIcon className="size-5 text-zinc-900" strokeWidth={3} />
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.influencer-slide{
  height:100px;
  width:90px;
}
`,
        }}
      ></style>
    </>
  );
}

function Graph() {
  const drawn = useRef(false);

  useEffect(() => {
    if (!drawn.current) {
      drawn.current = true;
      //   drawGraph();
    }
  }, []);
  return (
    <div className="px-4">
      <div className="flex items-center">
        <ChartColumnBigIcon className="size-5 text-[#606165]" />
        <div className="text-base font-semibold ml-2">Redemptions</div>
        <div className="ml-auto inline-flex items-center space-x-2 p-1 rounded-md bg-[#1b1c20]">
          <button
            className="w-16 bg-white text-[#1b1c20] rounded-md py-0.5 cursor-pointer"
            id="btn-24h"
          >
            24h
          </button>
          <button className="w-16 rounded-md py-0.5 cursor-pointer" id="btn-7d">
            7d
          </button>
          <button className="w-16 rounded-md py-0.5 cursor-pointer" id="btn-1m">
            1m
          </button>
        </div>
      </div>
      <div
        className="min-h-[175px] mt-2 bg-[#1b1c20] rounded-md"
        id="graph-container"
      ></div>
    </div>
  );
}
function QIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function Status() {
  return (
    <div className="grid grid-cols-3 gap-3 mt-2 px-4">
      {statusItems.map(
        ({ title, count, percentage, color1, color2, Icon }, idx) => (
          <div className="p-3 rounded-md  bg-[#1b1c20]" key={idx}>
            <div className="flex items-center  space-x-2 ">
              <div className="font-semibold">{title} </div>
              <div
                className="
          grid place-items-center size-5 bg-[#28292d] rounded-full text-[#65666b]"
              >
                <QIcon />
              </div>
            </div>

            <div className="flex items-center  space-x-3 mt-2">
              <div
                className="size-9 grid place-items-center  rounded-full  text-[#3c3c55]"
                style={{ background: color1 }}
              >
                <Icon className="size-5" />
              </div>
              <div className="text-lg">{count}</div>
              <div
                className=" py-0.5 px-2 rounded-md "
                style={{ background: color2 }}
              >
                + {percentage}%
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

const App = () => {
  return (
    <div className="bg-[#1e1e1e]">
      <SidebarLeft />
      <SidebarRight />
      <div className="pl-0 pr-0 xl:pl-64  xl:pr-64">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-b-md bg-[#1b1c20] pt-1 pb-4">
            <Dashboard />
          </div>
          <Influencers />
          <Graph />
          <Status />
        </div>
      </div>
    </div>
  );
};

export default App;
