import { Box } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Tile, { TileProp } from '../Tile/Tile'

type MoveDirection = 'up' | 'down' | 'left' | 'right'
interface BoardProp {
  gameStarted: boolean
  setIsGameOver: (state: boolean) => void // 傳遞 setState 函數
}
const Board: React.FC<BoardProp> = ({ gameStarted, setIsGameOver }) => {
  // ==== 固定畫面參數 ==== //
  const size = 4 // 4x4 格子
  const cellSize = 75 // 單格大小
  const gap = 8 // Grid 間距

  const generateGrid = (size: number = 4): TileProp[] => {
    return Array.from({ length: size * size }, (_, index) => ({
      id: index,
      actionId: Date.now(),
      value: Math.random() > 0.7 ? 2 : 0, // 初始時可能有 2
      position: {
        x: index % size,
        y: Math.floor(index / size),
      },
      isNew: false,
    }))
  }

  // ==== 初始資料 ==== //
  const [tiles, setTiles] = useState<TileProp[]>([])

  // 監聽輸入事件
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        const direction = e.key.replace('Arrow', '').toLocaleLowerCase()
        moveAction(direction as MoveDirection)
        break
      default:
        console.log('default')
        break
    }
  }, [])

  const moveTiles = (
    direction: MoveDirection,
    tiles: TileProp[],
    size: number
  ) => {
    let newTiles = tiles.map((tile) => ({ ...tile, isNew: false }))

    // 方向對應的排列方式
    const isVertical = direction === 'up' || direction === 'down'
    const isReversed = direction === 'down' || direction === 'right'

    let updatedTiles: TileProp[] = [] // 用來存儲更新後的 tiles

    for (let i = 0; i < size; i++) {
      // 取出一行或一列
      let line = newTiles
        .filter((tile) =>
          isVertical ? tile.position.x === i : tile.position.y === i
        )
        .sort((a, b) =>
          isReversed
            ? isVertical
              ? b.position.y - a.position.y
              : b.position.x - a.position.x
            : isVertical
              ? a.position.y - b.position.y
              : a.position.x - b.position.x
        )

      let values = line.map((tile) => tile.value).filter((v) => v !== 0)

      // **合併相同的數字**
      let mergedValues: number[] = []
      let skip = false
      for (let i = 0; i < values.length; i++) {
        if (skip) {
          skip = false
          continue
        }
        if (values[i] === values[i + 1]) {
          mergedValues.push(values[i] * 2)
          skip = true
        } else {
          mergedValues.push(values[i])
        }
      }

      // **補 0 讓長度保持 size**
      while (mergedValues.length < size) mergedValues.push(0)

      // 創建新的陣列
      for (let j = 0; j < size; j++) {
        // 新的方塊
        let newValue = mergedValues[j]
        // 舊的方塊
        let oldTile = line[j]
        // 檢查舊方塊是否有移動

        updatedTiles.push({
          id: oldTile.id, // 保持原 ID
          actionId: Date.now(), // 更新 actionId
          value: newValue,
          isNew: false,
          position: isVertical
            ? { x: i, y: isReversed ? size - 1 - j : j }
            : { x: isReversed ? size - 1 - j : j, y: i },
        })
      }
    }

    return updatedTiles
  }

  const addNewTiles = (tiles: TileProp[]) => {
    const emptyTiles = tiles.filter((tile) => tile.value === 0)
    if (emptyTiles.length === 0) return tiles // 若沒有空位則不新增

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]

    // 確保新創而非直接修改
    const newTiles = tiles.map((tile) =>
      tile.id === randomTile.id
        ? {
            ...tile,
            value: Math.random() > 0.8 ? 2 : 4,
            isNew: true,
            actionId: Date.now(),
          }
        : tile
    )

    return newTiles // 返回新的陣列，確保 React 正確 re-render
  }

  /** 依列為分割的2維陣列 */
  const to2DArrayByRow = (tiles: TileProp[], size: number) => {
    return tiles.reduce<TileProp[][]>((grid, tile) => {
      if (!grid[tile.position.y]) {
        grid[tile.position.y] = Array(size).fill(null)
      }
      grid[tile.position.y][tile.position.x] = tile
      return grid
    }, [])
  }

  /** 依行為分割的2維陣列 */
  const to2DArrayByColumn = (tiles: TileProp[], size: number) => {
    return tiles.reduce<TileProp[][]>((grid, tile) => {
      if (!grid[tile.position.x]) {
        grid[tile.position.x] = Array(size).fill(null)
      }
      grid[tile.position.x][tile.position.y] = tile
      return grid
    }, [])
  }

  const checkCanMerged = (tiles: TileProp[]) => {
    let status = true
    const canMerge = (grid: TileProp[][]) =>
      grid.some((row) =>
        row.some(
          (tile, index) => index > 0 && tile.value === row[index - 1].value
        )
      )

    if (
      !canMerge(to2DArrayByRow(tiles, size)) &&
      !canMerge(to2DArrayByColumn(tiles, size))
    ) {
      status = false
    }
    return status
  }

  const moveAction = (direction: MoveDirection) => {
    // 設定畫面方塊
    setTiles((prevTiles) => {
      // 檢查動作，並處理上移與合併
      const newTiles = moveTiles(direction, prevTiles, size)
      if (!newTiles) return prevTiles // 若沒有變動則維持原資料

      // **等待 moveTiles 完成後，新增新的數字**
      const updatedTiles = addNewTiles(newTiles)
      return updatedTiles
    })
  }

  useEffect(() => {
    if (!gameStarted) return // 只有遊戲開始時才監聽鍵盤
    setTiles(generateGrid(size))
    window.addEventListener('keydown', handleKeyPress)

    // 關閉監聽事件
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameStarted])

  // 檢查遊戲是否結束了
  useEffect(() => {
    let timerId = 0
    // 檢查所有格子是否皆為非 0，是則要檢查是否還有可以合併的數字
    if (tiles.every((tile) => tile.value !== 0) && tiles.length > 0) {
      // 檢查是否還有可以合併的數字
      const canMerged = checkCanMerged(tiles)
      if (!canMerged) {
        timerId = setTimeout(() => {
          setIsGameOver(true)
        }, 1000)
      }
    }

    return () => clearTimeout(timerId)
  }, [tiles])

  return (
    <Box
      w="auto"
      h="auto"
      border="4px solid var(--chakra-colors-primary-700)"
      borderRadius="12px"
    >
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns={`repeat(${size}, ${cellSize}px)`}
        gridTemplateRows={`repeat(${size}, ${cellSize}px)`}
        gap={`${gap}px`}
        width={`${size * cellSize + (size - 1) * gap}px`}
        height={`${size * cellSize + (size - 1) * gap}px`}
        backgroundColor="gray.300"
        borderRadius="10px"
      >
        {/* 1️⃣ 渲染固定的空格 (Cell) */}
        {Array.from({ length: size * size }).map((_, index) => (
          <Box
            key={index}
            width="100%"
            height="100%"
            backgroundColor="gray.100"
            borderRadius="10px"
          />
        ))}
        {/* 2️⃣ 渲染動態的數字 (Tile) */}
        {tiles
          .filter((tile) => tile.value > 0)
          .map((item) => (
            <Tile key={item.id} {...item} gap={8}></Tile>
          ))}
      </Box>
    </Box>
  )
}

export default Board
