import level1Icon from '@/assets/images/level/level_1.png'
import level2Icon from '@/assets/images/level/level_1.png'
import level3Icon from '@/assets/images/level/level_1.png'
import level4Icon from '@/assets/images/level/level_1.png'
import level5Icon from '@/assets/images/level/level_1.png'

export function getIconByLevel(level: number) {
  switch (level) {
    case 1:
      return level1Icon
    case 2:
      return level2Icon
    case 3:
      return level3Icon
    case 4:
      return level4Icon
    case 5:
      return level5Icon
    default:
      return level1Icon
  }
}
