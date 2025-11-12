import { useState } from 'react';

const modeDescriptions = {
  random: '完全随机但保证和谐',
  complementary: '主色 + 互补色',
  triadic: '色相间隔120度的三角色',
  analogous: '色相间隔30度的类似色'
};

const PaletteModeSelector = ({ mode, setMode }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-4">
        <label htmlFor="mode" className="font-medium text-gray-700">
          配色模式
        </label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white"
        >
          <option value="random">随机</option>
          <option value="complementary">互补色</option>
          <option value="triadic">三角色</option>
          <option value="analogous">类似色</option>
        </select>
      </div>
      <div
        className="text-sm text-gray-500 italic px-4 py-2 bg-gray-50 rounded-lg max-w-md text-center"
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        {modeDescriptions[mode]}
      </div>
    </div>
  );
};

export default PaletteModeSelector;
