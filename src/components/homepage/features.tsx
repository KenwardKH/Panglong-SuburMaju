import { useTranslation } from "react-i18next";
import { FaMedal, FaTruck } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";

export default function Features() {
  const { t } = useTranslation();
  const featuresList = [
    {
      icon: <FaTruck />,
      title: t("features.delivery_title"),
      desc: t("features.delivery_desc"),
    },
    {
      icon: <FaMedal />,
      title: t("features.quality_title"),
      desc: t("features.quality_desc"),
    },
    {
      icon: <IoIosPricetags />,
      title: t("features.price_title"),
      desc: t("features.price_desc"),
    },
  ];
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="text-center ">
          <h1 className="text-4xl font-bold mb-2">Keunggulan Kami</h1>
          <h2 className="text-2xl font-semibold mb-4">Kenapa Memilih Toko Subur Maju?</h2>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center">
            {featuresList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border border-transparent shadow-md px-8 py-6 max-w-[320px] items-center text-center m-4 hover:shadow-xl transform duration-500 rounded-lg hover:border-gray-100 gap-1 hover:translate-y-1"
              >
                <div className="text-4xl p-4 mb-2 bg-yellow-200 rounded-full text-orange-500">
                  {item.icon}
                </div>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <p className="text-gray-600 text-balance">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
