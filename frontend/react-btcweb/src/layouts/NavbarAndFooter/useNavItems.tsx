import { ArrowOutwardOutlined, AssignmentOutlined, HistoryOutlined, HomeOutlined, Inventory2Outlined, InventoryOutlined, PointOfSaleOutlined, ShoppingCartOutlined, SouthWestOutlined } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

import React, { useEffect, useState } from 'react'

const list: Array<any> = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Stock and Products",
    icon: null
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Ingredients",
    icon: <InventoryOutlined />,
  },
  {
    text: "Inventory",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Deposit",
    icon: <SouthWestOutlined />,
  },
  {
    text: "Withdraw",
    icon: <ArrowOutwardOutlined />,
  },
  {
    text: "History",
    icon: <HistoryOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Sales View",
    icon: <PointOfSaleOutlined />,
  },
  // {
  //   text: "Daily",
  //   icon: <TodayOutlined />,
  // },
  // {
  //   text: "Monthly",
  //   icon: <CalendarMonthOutlined />,
  // },
  // {
  //   text: "Breakdown",
  //   icon: <PieChartOutlined />,
  // },
  {
    text: "Perform Sale",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Admnistration",
    icon: null
  },
  {
    text: "Users",
    icon: <Inventory2Outlined />,
  },
  // {
  //   text: "Perfomance",
  //   icon: <TrendingUpOutlined />,
  // },
  {
    text: "Registration",
    icon: null
  },
  {
    text: "Product Registration",
    icon: <AssignmentOutlined />,
  },
  {
    text: "Ingredient Registration",
    icon: <AssignmentOutlined />
  },
  {
    text: "Account Registration",
    icon: <AssignmentOutlined />
  },
]

export const useNavItems = () => {
  const { authState } = useAuth();
  const [items, setItems] = useState([...list]);

  useEffect(() => {
    let fileteredNavItems = [...list]
    if(authState.user?.roles[0] === 'ROLE_ADMIN') {
      // No item to remove
    } else if(authState.user?.roles[0] === 'ROLE_MODERATOR') {
      fileteredNavItems = fileteredNavItems.filter(item => 
        item.text !== 'Account Registration' &&
        item.text !== 'Admnistration' && 
        item.text !== 'Users' 
        
        );
    } else if (authState.user?.roles[0] ==="ROLE_USER"){
      console.log(authState.user?.roles[0])
      fileteredNavItems = fileteredNavItems.filter( item => 
        item.text !== 'Account Registration' &&
        item.text !== 'Ingredient Registration' &&
        item.text !== 'Product Registration' &&
        item.text !== 'Registration' &&
        item.text !== 'Admnistration' &&
        item.text !== 'Users' &&
        item.text !== 'Withdraw' &&
        item.text !== 'Deposit'
      );
    }
    setItems(fileteredNavItems); 
  }, [authState]);

  return { items }
}
