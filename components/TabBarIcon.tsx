import { ColorValue } from 'react-native';
import { 
  Compass, 
  Map, 
  Siren, 
  Users, 
  User,
  LucideProps 
} from 'lucide-react-native';

interface TabBarIconProps extends Omit<LucideProps, 'color'> {
  name: string;
  color: ColorValue;
  size?: number;
}

export default function TabBarIcon({ name, color, size = 24, ...props }: TabBarIconProps) {
  switch (name) {
    case 'compass':
      return <Compass color={color} size={size} {...props} />;
    case 'map':
      return <Map color={color} size={size} {...props} />;
    case 'siren':
      return <Siren color={color} size={size} {...props} />;
    case 'users':
      return <Users color={color} size={size} {...props} />;
    case 'user':
      return <User color={color} size={size} {...props} />;
    default:
      return <Compass color={color} size={size} {...props} />;
  }
}