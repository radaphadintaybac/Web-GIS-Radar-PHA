import React from "react";
import { productLegendConfigs } from "../../lib/data.js";

const ProductLegend = ({ activeProduct }) => {
  const config = productLegendConfigs[activeProduct];

  return (
    <>
      {config && (
        <div className="animate-in fade-in slide-in-from-right-2 absolute right-2 bottom-16 z-1000 w-16 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md duration-300 md:right-4 md:bottom-10 md:w-20 md:p-3 dark:border-slate-800 dark:bg-slate-900/95">
          {/* Header - Chỉ hiển thị đơn vị */}
          <div className="flex flex-col items-center gap-4 border-b border-slate-100 pb-1 dark:border-slate-800">
            <span className="text-[14px] font-bold text-slate-500 dark:text-slate-400">
              {config.unit}
            </span>

            <div className="flex h-45 items-stretch gap-1 md:h-82">
              {/* Color Bar Gradient */}
              <div
                className="w-3 shrink-0 overflow-hidden border border-black/5 shadow-inner md:w-4 dark:border-white/5"
                style={{
                  background: `linear-gradient(to top, ${config.steps.map((s) => s.color).join(",")})`,
                }}
              />

              {/* Labels Column */}
              <div className="relative flex flex-1 flex-col-reverse justify-between py-0.5">
                {config.steps.map((step, i) => {
                  // Hiển thị mốc đầu, mốc cuối và các mốc chẵn để tránh rối mắt trên màn hình nhỏ
                  const showLabel =
                    i === 0 || i === config.steps.length - 1 || i % 2 === 0;

                  return (
                    <div
                      key={i}
                      className="flex h-0 items-center gap-1 leading-none"
                    >
                      {showLabel && (
                        <>
                          <div className="h-px w-1 shrink-0 bg-slate-200 dark:bg-slate-700" />
                          <span className="text-[8px] font-bold text-slate-500 tabular-nums md:text-[12px] dark:text-slate-400">
                            {step.value}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ProductLegend);
