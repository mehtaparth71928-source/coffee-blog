import React, { useState } from 'react';
import { Coffee, Droplets, Scale, Sparkles, RefreshCw } from 'lucide-react';

interface BrewCalculatorProps {
  initialRatio?: number;
  initialMethod?: string;
}

export function BrewCalculator({ initialRatio = 16, initialMethod = 'Pour Over' }: BrewCalculatorProps) {
  const [method, setMethod] = useState(initialMethod);
  const [servings, setServings] = useState(2);
  const [cupSize, setCupSize] = useState(240); // 240 ml = standard 8oz mug

  // Pre-configured ratios
  const methodProfiles: Record<string, { ratio: number; grind: string; temp: string; note: string }> = {
    'Pour Over': {
      ratio: 16,
      grind: 'Medium (table salt)',
      temp: '93°C / 200°F',
      note: 'Pour in steady spirals with 45s bloom'
    },
    'French Press': {
      ratio: 15,
      grind: 'Coarse (sea salt)',
      temp: '95°C / 203°F',
      note: 'Steep for 4 full minutes before plunging'
    },
    'Cold Brew': {
      ratio: 8,
      grind: 'Extra Coarse (cracked peppercorns)',
      temp: 'Cold / Room Temp',
      note: 'Steep 16-20 hours, dilute 1:1 to serve'
    },
    'AeroPress': {
      ratio: 12,
      grind: 'Medium-Fine',
      temp: '88°C / 190°F',
      note: '90s steep then 30s gentle press'
    },
    'Moka Pot': {
      ratio: 7,
      grind: 'Fine (sand)',
      temp: 'Boiling water in base',
      note: 'Remove from heat as soon as foam sputters'
    }
  };

  const currentProfile = methodProfiles[method] || methodProfiles['Pour Over'];
  const totalWater = servings * cupSize;
  const coffeeBeansGrams = Math.round(totalWater / currentProfile.ratio);

  return (
    <div className="my-10 bg-[#F4EDE4] border border-[#E0D3C4] rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E0D3C4] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C5332]">
            <Sparkles className="w-4 h-4 text-[#8C5332]" />
            <span>Interactive Barista Tool</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#2D1E18] mt-1">
            Coffee Brew & Water Ratio Calculator
          </h3>
          <p className="text-sm text-[#665448] mt-1">
            Calculate precise grams of ground coffee and water volume for balanced extraction.
          </p>
        </div>

        {/* Method selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="brewMethod" className="text-xs font-semibold text-[#4A3B32]">
            Method:
          </label>
          <select
            id="brewMethod"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="text-sm bg-white border border-[#D1BEAF] rounded-lg px-3 py-2 text-[#2D1E18] font-medium focus:outline-none focus:ring-2 focus:ring-[#8C5332]"
          >
            {Object.keys(methodProfiles).map((m) => (
              <option key={m} value={m}>
                {m} (1:{methodProfiles[m].ratio})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
        <div>
          <div className="flex justify-between text-sm font-semibold text-[#3D2F27] mb-2">
            <span>Number of Servings:</span>
            <span className="text-[#8C5332] font-bold">{servings} {servings === 1 ? 'cup' : 'cups'}</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-full accent-[#8C5332] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1">
            <span>1 cup</span>
            <span>2 cups</span>
            <span>3 cups</span>
            <span>4 cups</span>
            <span>6 cups</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-semibold text-[#3D2F27] mb-2">
            <span>Mug Capacity:</span>
            <span className="text-[#8C5332] font-bold">{cupSize} ml ({Math.round(cupSize / 30)} oz)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[180, 240, 350].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setCupSize(size)}
                className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  cupSize === size
                    ? 'bg-[#2D1E18] text-[#FAF7F2] border-[#2D1E18]'
                    : 'bg-white text-[#4A3B32] border-[#D8C7B9] hover:bg-[#EFE7DD]'
                }`}
              >
                {size} ml ({size === 180 ? 'Small' : size === 240 ? 'Standard' : 'Large'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculated Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#DECFC0] flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#8C5332] shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6D] uppercase tracking-wider">
              Coffee Beans
            </div>
            <div className="text-xl font-bold text-[#2D1E18]">
              {coffeeBeansGrams} grams
            </div>
            <div className="text-[11px] text-[#7A675B]">
              ≈ {Math.round(coffeeBeansGrams / 5)} level tbsp
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#DECFC0] flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#E6F3FA] flex items-center justify-center text-[#2A7B9B] shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6D] uppercase tracking-wider">
              Filtered Water
            </div>
            <div className="text-xl font-bold text-[#2D1E18]">
              {totalWater} ml
            </div>
            <div className="text-[11px] text-[#7A675B]">
              Brew Ratio 1:{currentProfile.ratio}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#DECFC0] flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#554338] shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#8C7A6D] uppercase tracking-wider">
              Grind & Water Temp
            </div>
            <div className="text-sm font-bold text-[#2D1E18] truncate">
              {currentProfile.grind}
            </div>
            <div className="text-[11px] text-[#7A675B]">
              {currentProfile.temp}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#7A675B] italic text-center">
        💡 Pro extraction tip: {currentProfile.note}.
      </p>
    </div>
  );
}
