import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown, Check, Sparkles } from 'lucide-react';

interface TimePickerProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  value,
  onChange,
  error,
  placeholder = 'Select arrival time (e.g. 09:30 AM)',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse 12-hour time: "09:30 AM" or fallback to 09, 00, AM
  const parseTime = (timeStr: string) => {
    const match = timeStr?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      let h = parseInt(match[1], 10);
      if (h < 1) h = 1;
      if (h > 12) h = 12;
      return {
        hour: h,
        minute: match[2],
        period: (match[3]?.toUpperCase() as 'AM' | 'PM') || 'AM',
      };
    }
    return { hour: 9, minute: '00', period: 'AM' as const };
  };

  const parsed = parseTime(value);
  const [selectedHour, setSelectedHour] = useState<number>(parsed.hour);
  const [selectedMinute, setSelectedMinute] = useState<string>(parsed.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(parsed.period);
  const [activeTab, setActiveTab] = useState<'hours' | 'minutes'>('hours');

  // Sync internal state when external value changes
  useEffect(() => {
    if (value) {
      const p = parseTime(value);
      setSelectedHour(p.hour);
      setSelectedMinute(p.minute);
      setSelectedPeriod(p.period);
    }
  }, [value]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const updateFormattedTime = (h: number, m: string, p: 'AM' | 'PM') => {
    const formattedHour = h.toString().padStart(2, '0');
    const formatted = `${formattedHour}:${m} ${p}`;
    onChange(formatted);
  };

  const handleHourSelect = (h: number) => {
    setSelectedHour(h);
    updateFormattedTime(h, selectedMinute, selectedPeriod);
    setActiveTab('minutes'); // Automatically guide to minutes selection
  };

  const handleMinuteSelect = (m: string) => {
    setSelectedMinute(m);
    updateFormattedTime(selectedHour, m, selectedPeriod);
  };

  const handlePeriodSelect = (p: 'AM' | 'PM') => {
    setSelectedPeriod(p);
    updateFormattedTime(selectedHour, selectedMinute, p);
  };

  // Clock Dial Hours: 1 to 12
  const hoursList = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Common Minute Intervals: 00, 15, 30, 45, plus other 5-min increments
  const minutesList = ['00', '15', '30', '45', '10', '20', '40', '50'];

  // Convenient Quick Time Slots
  const quickSlots = [
    { label: '8:00 AM', h: 8, m: '00', p: 'AM' as const },
    { label: '9:30 AM', h: 9, m: '30', p: 'AM' as const },
    { label: '11:00 AM', h: 11, m: '00', p: 'AM' as const },
    { label: '1:30 PM', h: 1, m: '30', p: 'PM' as const },
    { label: '3:00 PM', h: 3, m: '00', p: 'PM' as const },
    { label: '4:30 PM', h: 4, m: '30', p: 'PM' as const },
  ];

  const handleQuickSelect = (slot: typeof quickSlots[0]) => {
    setSelectedHour(slot.h);
    setSelectedMinute(slot.m);
    setSelectedPeriod(slot.p);
    updateFormattedTime(slot.h, slot.m, slot.p);
    setIsOpen(false);
  };

  const handleDone = () => {
    updateFormattedTime(selectedHour, selectedMinute, selectedPeriod);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Input Display */}
      <div
        id={id}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border text-left cursor-pointer transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#D94D78] ${
          error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25 hover:border-[#75401F]/40'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Clock className="w-4 h-4 text-[#D94D78] shrink-0" />
          <span
            className={`text-sm font-semibold truncate ${
              value ? 'text-[#542B16] font-bold' : 'text-[#352319]/45'
            }`}
          >
            {value || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#75401F] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D94D78]' : ''
          }`}
        />
      </div>

      {/* Interactive Time Selection Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-[320px] mt-2 bg-[#FFFDF9] rounded-2xl border-2 border-[#75401F]/20 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Top Digital Display & AM/PM Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-[#75401F]/15 mb-3">
            {/* Time Readout: Tapping hour/minute switches mode */}
            <div className="flex items-center gap-1 font-display">
              <button
                type="button"
                onClick={() => setActiveTab('hours')}
                className={`px-2.5 py-1.5 rounded-lg text-xl sm:text-2xl font-black transition-colors cursor-pointer ${
                  activeTab === 'hours'
                    ? 'bg-[#542B16] text-white shadow-xs'
                    : 'bg-[#F6F0E7] text-[#542B16] hover:bg-[#ebdccb]'
                }`}
              >
                {selectedHour.toString().padStart(2, '0')}
              </button>
              <span className="text-xl font-bold text-[#542B16] px-0.5">:</span>
              <button
                type="button"
                onClick={() => setActiveTab('minutes')}
                className={`px-2.5 py-1.5 rounded-lg text-xl sm:text-2xl font-black transition-colors cursor-pointer ${
                  activeTab === 'minutes'
                    ? 'bg-[#542B16] text-white shadow-xs'
                    : 'bg-[#F6F0E7] text-[#542B16] hover:bg-[#ebdccb]'
                }`}
              >
                {selectedMinute}
              </button>
            </div>

            {/* AM / PM Segmented Control */}
            <div className="flex items-center p-0.5 rounded-xl bg-[#F6F0E7] border border-[#75401F]/15">
              <button
                type="button"
                onClick={() => handlePeriodSelect('AM')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedPeriod === 'AM'
                    ? 'bg-[#D94D78] text-white shadow-xs'
                    : 'text-[#542B16] hover:text-[#D94D78]'
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => handlePeriodSelect('PM')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedPeriod === 'PM'
                    ? 'bg-[#D94D78] text-white shadow-xs'
                    : 'text-[#542B16] hover:text-[#D94D78]'
                }`}
              >
                PM
              </button>
            </div>
          </div>

          {/* Subheader / Mode Indicator */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#75401F]">
              {activeTab === 'hours' ? 'Select Preferred Hour (1–12)' : 'Select Preferred Minute'}
            </span>
            <div className="flex gap-1 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('hours')}
                className={`hover:underline cursor-pointer ${activeTab === 'hours' ? 'text-[#D94D78]' : 'text-[#352319]/60'}`}
              >
                Hour
              </button>
              <span className="text-[#352319]/40">&bull;</span>
              <button
                type="button"
                onClick={() => setActiveTab('minutes')}
                className={`hover:underline cursor-pointer ${activeTab === 'minutes' ? 'text-[#D94D78]' : 'text-[#352319]/60'}`}
              >
                Minute
              </button>
            </div>
          </div>

          {/* Clock-Style Grid */}
          {activeTab === 'hours' ? (
            /* Hours 1-12 Grid */
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                const isSelected = selectedHour === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleHourSelect(h)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#542B16] text-white shadow-xs scale-102 ring-2 ring-[#D94D78]'
                        : 'bg-[#F6F0E7] text-[#542B16] hover:bg-[#ebdccb]'
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Minutes Grid */
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {minutesList.map((m) => {
                const isSelected = selectedMinute === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMinuteSelect(m)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#542B16] text-white shadow-xs scale-102 ring-2 ring-[#D94D78]'
                        : 'bg-[#F6F0E7] text-[#542B16] hover:bg-[#ebdccb]'
                    }`}
                  >
                    :{m}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Preset Shortcuts */}
          <div className="pt-2 border-t border-[#75401F]/10 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#75401F] block mb-1.5 px-0.5">
              Popular Appointment Times
            </span>
            <div className="grid grid-cols-3 gap-1">
              {quickSlots.map((slot) => (
                <button
                  key={slot.label}
                  type="button"
                  onClick={() => handleQuickSelect(slot)}
                  className="px-1.5 py-1 rounded-lg bg-[#F6F0E7]/80 hover:bg-[#ebdccb] text-[11px] font-bold text-[#542B16] text-center transition-colors cursor-pointer"
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Action: Done Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-2.5 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] text-white font-black text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm {selectedHour.toString().padStart(2, '0')}:{selectedMinute} {selectedPeriod}</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
